import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';

import useSession from '../Session/useSession';

import {
  ChatBubbleButton,
  ChatWindowContainer,
  ChatHeader,
  CloseButton,
  MessagesContainer,
  MessageBubble,
  InputContainer,
  StyledInput,
  SendButton,
  LoadingDots,
  EmptyState,
  ErrorMessage,
} from './AIChat.styles';

const CHAT_MUTATION = gql`
  mutation Chat($messages: [ChatMessageInput!]!, $context: ChatContextInput) {
    chat(messages: $messages, context: $context) {
      success
      response
      model
      backend
    }
  }
`;

const ChatBubble = () => {
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [chat, { loading: isLoading }] = useMutation(CHAT_MUTATION, {
    onError: err => {
      console.error('AI Chat error:', err);
      setError(err.message || 'Failed to get response. Please try again.');
    },
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Only show chat bubble when authenticated (must be after all hooks)
  if (!session?.me) {
    return null;
  }

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    setError(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmedInput,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);

    try {
      // Build messages array for GraphQL
      const chatMessages = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: trimmedInput },
      ];

      const { data } = await chat({
        variables: {
          messages: chatMessages,
          context: {
            app: 'educationelly-graphql',
          },
        },
      });

      if (data?.chat?.success) {
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.chat.response,
          timestamp: new Date().toISOString(),
          backend: data.chat.backend,
          model: data.chat.model,
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (err) {
      // Error handled by onError callback
    } finally {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = e => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  return (
    <>
      <ChatBubbleButton
        onClick={toggleChat}
        $isOpen={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat'}
        title="AI Assistant"
      >
        {isOpen ? '×' : '💬'}
      </ChatBubbleButton>

      {isOpen && (
        <ChatWindowContainer role="dialog" aria-label="AI Chat">
          <ChatHeader>
            <h3>🤖 AI Assistant</h3>
            <CloseButton onClick={toggleChat} aria-label="Close chat">
              ×
            </CloseButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.length === 0 ? (
              <EmptyState>
                <h4>Welcome!</h4>
                <p>Ask me anything about teaching</p>
                <p>ELL students or education topics.</p>
              </EmptyState>
            ) : (
              messages.map(message => (
                <MessageBubble
                  key={message.id}
                  $isUser={message.role === 'user'}
                >
                  {message.content}
                </MessageBubble>
              ))
            )}

            {isLoading && (
              <MessageBubble $isUser={false}>
                <LoadingDots>
                  <span />
                  <span />
                  <span />
                </LoadingDots>
              </MessageBubble>
            )}

            <div ref={messagesEndRef} />
          </MessagesContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputContainer onSubmit={handleSubmit}>
            <StyledInput
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isLoading}
              rows={1}
            />
            <SendButton type="submit" disabled={isLoading || !input.trim()}>
              Send
            </SendButton>
          </InputContainer>
        </ChatWindowContainer>
      )}
    </>
  );
};

export default ChatBubble;

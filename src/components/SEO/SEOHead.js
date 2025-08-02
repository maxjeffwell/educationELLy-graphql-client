import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = 'educationELLy: Where All Teachers Are Language Teachers',
  description = 'Comprehensive education management platform for teachers and students. Manage student records, track progress, and enhance learning outcomes with educationELLy.',
  keywords = 'education management, student records, teacher tools, education platform, student tracking, learning management',
  canonicalUrl = 'https://educationelly-client-graphql-176ac5044d94.herokuapp.com/',
  ogImage = 'https://educationelly-client-graphql-176ac5044d94.herokuapp.com/og-image.jpg',
  twitterImage = 'https://educationelly-client-graphql-176ac5044d94.herokuapp.com/twitter-image.jpg',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <link rel="canonical" href={canonicalUrl} />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="educationELLy" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={twitterImage} />
  </Helmet>
);

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.string,
  twitterImage: PropTypes.string,
};

export default SEOHead;

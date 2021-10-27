import React from 'react';
import PublicLayout from '../../components/layout/public';

export default function PageNotFound() {
  return (
    <PublicLayout>
      <div className="404-page pt-5">
        <h1>404, Page no found</h1>
        <a href="/admin/home">
          <h5>Back to home</h5>
        </a>
      </div>
    </PublicLayout>
  );
}

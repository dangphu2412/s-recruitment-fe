import Link from 'next/link';
import React from 'react';
import { NextPageWithLayout } from '../shared/next.types';
import { NoLayout } from '../shared/ui/NoLayout';
import { Button } from '@chakra-ui/react';

const NotFoundPage: NextPageWithLayout = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-primary font-mono">404</div>
          <h1 className="text-4xl font-bold text-foreground font-sans text-balance">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty">
            It looks like the page you're looking for doesn't exist. But don't
            worry, we've got you covered!
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-6">
          {/* Primary Action */}
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-primary-foreground px-8 py-3 text-lg"
            >
              Go to Home
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Help
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = NoLayout;

export default NotFoundPage;

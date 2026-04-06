const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-muted-foreground">
            {'<'} Built with <span className="text-primary">passion</span> & <span className="text-secondary">code</span> {'/>'} 
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yeshwanth Kumar Domala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

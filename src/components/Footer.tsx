const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-display text-xl tracking-wider text-gradient-gold">
          B-Found
        </a>

        <div className="flex items-center gap-8">
          {["Facebook", "Instagram", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} B-Found. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

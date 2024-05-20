function Footer() {
  const getEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 6) {
      return '🌜'; // Late night
    } else if (hour < 12) {
      return '☀️'; // Morning
    } else if (hour < 18) {
      return '🌞'; // Afternoon
    } else {
      return '🌛'; // Evening
    }
  };

  return (
    <footer className="shadow-inner mt-8 bg-theme-card-bg">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-sm text-theme-text">
          © {new Date().getFullYear()} Bookmark Manager 🔏. All rights
          reserved. {getEmoji()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

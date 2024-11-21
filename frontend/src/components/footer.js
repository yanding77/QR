import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <h3 style={styles.title}>Síguenos en redes!</h3>
      <div style={styles.buttonContainer}>
        <a href="https://wa.me/your-number" style={styles.button} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href="https://www.facebook.com/LaBalsa.ec/" style={styles.button} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.instagram.com/labalsa.ec/%3Fhl%3Des&ved=2ahUKEwjSobuRnOuJAxXAtokEHci7AV8QFnoECEMQAQ&usg=AOvVaw3SGhZbBvGAMoPlrVEMf-qi" style={styles.button} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "6px",
    backgroundColor: "rgb(3, 31, 36)", // Dark greenish color
    borderRadius: "10px", // Optional: rounded corners
    border: "5px solid #e4c9a6", /* Light gold border */
    fontFamily: 'Lora, serif',
  },
  title: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#fff", // White color for tex
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    textDecoration: "none",
    padding: "10px 15px",
    color: "#fff", // White text
    fontSize: "14px",
    fontWeight: "bold",
    transition: "opacity 0.3s",
  },
  buttonHover: {
    opacity: 0.7, // Slight fade effect on hover
  },

  
};


export default Footer;

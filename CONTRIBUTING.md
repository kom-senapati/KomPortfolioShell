# Contributing to TermFolio

Thank you for considering contributing to **TermFolio**, an interactive terminal-style portfolio template! We welcome your contributions to enhance the project and improve its functionality. Before you start, please review the following guidelines.

---

## How to Contribute

There are several ways to contribute to **TermFolio**:

### 1. Reporting Bugs
If you encounter any bugs, please **open an issue** with the following details:
- **Steps to reproduce** the issue.
- **Expected behavior** vs **Actual behavior**.
- Relevant **screenshots** or **error messages**.

### 2. Suggesting Features
Have an idea for a new feature? Please **open an issue** to discuss your suggestion before starting development. This ensures the idea aligns with the project vision and avoids duplication.

### 3. Fixing Bugs
Find an open issue you'd like to work on? Go ahead and submit a **pull request** if it's unassigned. Make sure to:
- Clearly describe the issue.
- Add tests if applicable.
- Ensure the fix doesn't break existing functionality.

### 4. Adding New Features
If you'd like to add a feature, open an issue to discuss it first. Once approved, implement your feature and submit a pull request.

### 5. Improving Documentation
Documentation is key to the project's success. If you find any unclear or outdated sections, feel free to submit a pull request.

---

## Project Structure

The project follows this structure:

```plaintext
PortfolioShell/
│── public/                # Static assets
│── src/                   # Source code  
│   ├── config/            # JSON config files  
│   │   ├── user.json      # User information  
│   │   ├── config.json    # Portfolio configuration  
│   │   ├── commands.json  # Terminal commands  
│   ├── js/                # JavaScript files  
│   │   ├── script.js      # Main terminal interaction  
│   │   ├── user.js        # Handles user.json  
│   │   ├── config.js      # Handles config.json  
│   │   ├── commands.js    # Loads commands.json  
│   ├── styles/            # CSS/SCSS for theming  
│   │   ├── style.css      # Main stylesheet  
│── index.html             # Main HTML file  
│── README.md              # Documentation
│── CONTRIBUTING.md              # Contribution
```

---

## How to Submit a Pull Request

1. **Fork the Repository**: Click the "Fork" button at the top-right of the repository page.
2. **Clone Your Fork**:  
   ```bash
   git clone https://github.com/your-username/PortfolioShell.git
   ```
3. **Create a New Branch**:  
   Name your branch something descriptive like `feature/add-dark-mode`.
   ```bash
   git checkout -b feature/add-dark-mode
   ```
4. **Make Changes**: Implement your feature or fix.
5. **Test Thoroughly**: Verify everything works as expected.
6. **Commit Changes**:  
   Use clear and descriptive commit messages.
   ```bash
   git commit -m "Added dark mode feature"
   ```
7. **Push Changes**:  
   ```bash
   git push origin feature/add-dark-mode
   ```
8. **Open a Pull Request**: Describe your changes and why they're necessary.

---

## Coding Guidelines

To maintain code quality, please follow these rules:

- **Use 2 spaces for indentation**.
- **Write clear, descriptive variable names**.
- **Keep functions small and focused**.
- **Break down large pull requests into smaller pieces**.

### File Organization
- JSON config files go inside `src/config/`.
- JavaScript files are organized inside `src/js/`.
- CSS/SCSS files are inside `src/styles/`.

---

## Testing

Before submitting a pull request, ensure that:

- The project works locally.
- The design is **responsive** across devices.
- It functions correctly on **Chrome**, **Firefox**, and **Safari**.

---

## Setup and Deployment

Follow these steps to set up **TermFolio** locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kom-senapati/TerminalFolio.git
   ```
2. **Customize Config Files**:  
   Edit `user.json`, `config.json`, and `commands.json` in `src/config/`.
3. **Modify Styles** (Optional):  
   Customize `style.css` in `src/styles/`.
4. **Deploy**:  
   Use static hosting platforms like [GitHub Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), or [Vercel](https://vercel.com/).

---

## Code of Conduct

By contributing to **TermFolio**, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

### Our Expectations:
- **Respect others**.
- **Be inclusive and welcoming**.
- **Collaborate constructively**.

---

## Resources

- [GitHub Docs](https://docs.github.com/)
- [How to Fork a Repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [How to Create a Pull Request](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
- [MDN Web Docs](https://developer.mozilla.org/)

---

Thank you for helping make **TermFolio** better! 🚀
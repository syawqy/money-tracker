# Personal Money Tracker

A modern, responsive web application for tracking personal finances with features for managing income and expenses, categorizing transactions, and visualizing spending patterns.

## Features

- **Transaction Management**
  - Add income and expense transactions
  - Categorize transactions
  - Add descriptions and dates
  - View transaction history

- **Category Management**
  - Create custom categories for both income and expenses
  - Edit existing categories
  - Delete unused categories
  - Default categories provided

- **Data Visualization**
  - Pie charts for income and expense distribution
  - Filter transactions by time period (daily/weekly/monthly/yearly)
  - Custom date range selection
  - Real-time updates

- **User Interface**
  - Clean and modern design
  - Responsive layout
  - Smooth animations
  - Toast notifications
  - Dark mode support

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Form Management**: React Hook Form
- **State Management**: React Query

## Project Structure

```
src/
├── components/       # UI components
├── hooks/           # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
└── types/          # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd money-tracker
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the chart components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

---

For more information or support, please open an issue in the GitHub repository.

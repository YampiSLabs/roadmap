import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Runtime error captured by ErrorBoundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="dashboard-shell py-8 sm:py-10">
          <section
            className="glass-panel top-divider rounded-2xl border border-rose-300/25 bg-rose-400/8 p-5 sm:p-6"
            aria-labelledby="runtime-error-title"
          >
            <h1 id="runtime-error-title" className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Ocurrio un error inesperado
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
              Recarga la pagina para reintentar. Si el problema continua, revisa la consola del navegador y el
              despliegue mas reciente.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

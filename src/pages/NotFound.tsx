import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-slate-300">Página no encontrada</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al Inicio
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Regresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 
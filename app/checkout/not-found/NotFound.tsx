export const dynamic = 'force-dynamic';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;

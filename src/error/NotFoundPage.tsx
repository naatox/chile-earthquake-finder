import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/image3.jpg')" }}
    >
        <Card className="max-w-md bg-opacity-80 bg-white p-6 shadow-2xl ">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-red-500">404</CardTitle>
            <CardDescription className="text-center">
              Page Not Found
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p>The page you are looking for does not exist or has been moved.</p>
            <Button onClick={() => navigate("/home")} variant="default">
              Go back to home
            </Button>
          </CardContent>
        </Card>
    </div>
  );
};

export default NotFoundPage;

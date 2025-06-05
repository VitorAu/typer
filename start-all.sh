set -e

SPRING_FOLDER="typer_api"
REACT_FOLDER="typer_client"

echo "🔧 Installing backend dependencies..."
(cd "$SPRING_FOLDER" && ./mvnw clean install -DskipTests)

echo "🔧 Installing frontend dependencies..."
(cd "$REACT_FOLDER" && npm install)

echo "🚀 Starting Spring Boot backend..."
(cd "$SPRING_FOLDER" && ./mvnw spring-boot:run) &

echo "🚀 Starting React Vite frontend..."
(cd "$REACT_FOLDER" && npm run dev) &

wait

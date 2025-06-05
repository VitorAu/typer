import { Link } from "react-router";
import Typewriter from "typewriter-effect";
const greet = [
  "Olá",
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Olá",
  "Привет",
  "你好",
  "こんにちは",
  "안녕하세요",
  "مرحبا",
  "नमस्ते",
  "Merhaba",
  "Sawubona",
  "Habari",
  "Shalom",
  "Hej",
  "Hei",
  "Halló",
  "Tere",
  "Halo",
  "Aloha",
  "Salam",
  "Zdravo",
  "Czesc",
  "Xin chào",
  "Selam",
  "Kamusta",
  "Szia",
  "Sveiki",
  "Labas",
  "Bok",
  "Sannu",
  "Salve",
  "Kaixo",
  "Oláh",
  "Yassas",
  "Dobrý den",
  "Hallochen",
  "Privit",
  "Dia dhuit",
  "Moïen",
  "Hyvää päivää",
  "God dag",
  "Konnichiwa",
  "Namaskaram",
  "Salut",
  "Përshëndetje",
  "Hujambo",
  "Asalaam Alaikum",
];

export function HomePage() {
  return (
    <section className="flex flex-col items-center gap-10">
      <div className="w-full text-center space-y-4">
        <h1 className="text-2xl font-thin filter brightness-125">TYPER</h1>
        <div className="font-thin filter brightness-125">
          <Typewriter
            options={{
              strings: greet,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link
          to="/auth/login"
          className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
        >
          login
        </Link>
        <Link
          to="/auth/register"
          className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
        >
          register
        </Link>
      </div>
    </section>
  );
}

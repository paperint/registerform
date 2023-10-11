import RegisterForm from "./components/RegisterForm";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen p-24 bg-orange-100">
      <RegisterForm />
    </section>
  );
}

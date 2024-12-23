export default function CTA() {
  return (
    <section className=" bg-app">
      <div className="fill-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill-opacity="1"
            d="M0,256L48,234.7C96,213,192,171,288,176C384,181,480,235,576,213.3C672,192,768,96,864,101.3C960,107,1056,213,1152,240C1248,267,1344,213,1392,186.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-screen-lg mx-auto p-10 space-y-4">
        <h1 className="text-5xl text-white font-extrabold text-center">
          Is there a business challenge that is bothering you?
        </h1>
        <h3 className="text-lg text-gray-300 text-center">
          Write to us and we will get back to you with a response soon.
        </h3>
      </div>
      <div className="fill-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill-opacity="1"
            d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,69.3C672,64,768,96,864,106.7C960,117,1056,107,1152,85.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

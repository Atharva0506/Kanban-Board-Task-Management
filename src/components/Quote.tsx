import { ForwardIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface Quote {
  text: string;
  author: string;
}

function QuoteComponent() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data: Quote[]) => {
        setQuotes(data);
      })
      .catch((error) => console.error("Error fetching quotes:", error));
  }, []);

  const handleNextQuote = () => {
    if (currentQuoteIndex < quotes.length - 1) {
      setCurrentQuoteIndex(currentQuoteIndex + 1);
    } else {
      // Loop back to the first quote if we reach the end
      setCurrentQuoteIndex(0);
    }
  };

  return (
    <div className="flex items-center px-5 justify-center md:my-4 md:py-5">
      <div className="flex items-center rounded-xl text-sm shadow-xl pr-5 bg-white italic max-w-3xl p-5 text-[#0055D1]">
        
          <div>
            <p> {'" ' + quotes[currentQuoteIndex]?.text + ' "'}</p>
            <p>- {quotes[currentQuoteIndex]?.author}</p>
          </div>
          <button onClick={handleNextQuote}><ForwardIcon className="text-green-600 h-6 w-6"/></button>
        
      </div>
    </div>
  );
}
export default QuoteComponent;

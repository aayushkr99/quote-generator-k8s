const express = require('express');
const app = express();
 // Allow frontend origin

 const cors = require('cors');
app.use(cors({ origin: '*' })); // Allow frontend origin



const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Do not watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Dream big and dare to fail. - Norman Vaughan",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "It always seems impossible until it's done. - Nelson Mandela",
    "Success is how high you bounce when you hit bottom. - George S. Patton",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Act as if what you do makes a difference. It does. - William James",
    "Don’t count the days, make the days count. - Muhammad Ali",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. - Brian Tracy",
    "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
    "Don’t let yesterday take up too much of today. - Will Rogers",
    "If you are not willing to risk the usual, you will have to settle for the ordinary. - Jim Rohn",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
    "Do what you can with all you have, wherever you are. - Theodore Roosevelt",
    "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome. - William James",
    "Opportunities don't happen. You create them. - Chris Grosser",
    "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
    "Whether you think you can or think you can’t, you’re right. - Henry Ford",
    "Action is the foundational key to all success. - Pablo Picasso",
    "Success is not in what you have, but who you are. - Bo Bennett",
    "The secret of getting ahead is getting started. - Mark Twain",
    "The harder the conflict, the greater the triumph. - George Washington",
    "The man who has confidence in himself gains the confidence of others. - Hasidic Proverb",
    "If you can dream it, you can do it. - Walt Disney",
    "With the new day comes new strength and new thoughts. - Eleanor Roosevelt",
    "What we achieve inwardly will change outer reality. - Plutarch",
    "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
    "If you want to lift yourself up, lift up someone else. - Booker T. Washington",
    "We may encounter many defeats but we must not be defeated. - Maya Angelou",
    "Do what you love, and success will follow. Passion is the fuel behind a successful career. - Meg Whitman",
    "The best revenge is massive success. - Frank Sinatra",
    "Don’t wait. The time will never be just right. - Napoleon Hill",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "To succeed in life, you need two things: ignorance and confidence. - Mark Twain",
    "Nothing is impossible, the word itself says, ‘I’m possible!’ - Audrey Hepburn",
    "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
    "A year from now you may wish you had started today. - Karen Lamb",
    "The best preparation for tomorrow is doing your best today. - H. Jackson Brown, Jr.",
    "Success is a journey, not a destination. - Arthur Ashe",
    "Failure is the condiment that gives success its flavor. - Truman Capote",
    "Happiness is not something you postpone for the future; it is something you design for the present. - Jim Rohn",
    "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
    "Courage is resistance to fear, mastery of fear—not absence of fear. - Mark Twain",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
    "The question isn’t who is going to let me; it’s who is going to stop me. - Ayn Rand",
    "Don’t watch the clock; do what it does. Keep going. - Sam Levenson",
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "A goal is a dream with a deadline. - Napoleon Hill",
    "Go as far as you can see; when you get there, you’ll be able to see further. - Thomas Carlyle",
    "Don’t wait for opportunity. Create it. - George Bernard Shaw",
    "Happiness is not by chance, but by choice. - Jim Rohn",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The biggest risk is not taking any risk. - Mark Zuckerberg",
    "Small deeds done are better than great deeds planned. - Peter Marshall",
    "Life is either a daring adventure or nothing at all. - Helen Keller",
    "If you’re going through hell, keep going. - Winston Churchill",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
    "Don’t limit your challenges. Challenge your limits. - Unknown",
    "Success is a state of mind. If you want success, start thinking of yourself as a success. - Joyce Brothers",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "The difference between ordinary and extraordinary is that little extra. - Jimmy Johnson",
    "Be so good they can’t ignore you. - Steve Martin",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "Don’t let the fear of losing be greater than the excitement of winning. - Robert Kiyosaki",
    "Your limitation—it’s only your imagination. - Unknown",
    "Great things never come from comfort zones. - Unknown",
    "Wake up with determination. Go to bed with satisfaction. - Unknown",
    "Success doesn’t just find you. You have to go out and get it. - Unknown",
    "Dream it. Wish it. Do it. - Unknown",
    "Do something today that your future self will thank you for. - Unknown",
    "Push yourself, because no one else is going to do it for you. - Unknown",
    "Sometimes later becomes never. Do it now. - Unknown",
    "The key to success is to focus on goals, not obstacles. - Unknown",
    "Don’t stop when you’re tired. Stop when you’re done. - Unknown",
    "Don’t wait for the right opportunity: create it. - George Bernard Shaw",
    "Success is not just about making money. It’s about making a difference. - Unknown",
  ];

  function getRandomQuotes(quotesArray, numberOfQuotes) {
    if (numberOfQuotes > quotesArray.length) {
        throw new Error("Number of quotes requested exceeds the available quotes.");
    }

    const shuffled = [...quotesArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numberOfQuotes);
}

app.get('/api', (req, res) => {
    try{
        const {number} = req.query;
        const defaultCount = 3;
        const randomQuotes = getRandomQuotes(quotes, Number(number) || defaultCount);
        console.log(randomQuotes);

        res.json({ quotes: randomQuotes });
    }catch(err){
        return res.json({status : false, message : err.message})
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

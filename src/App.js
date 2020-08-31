import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from 'words-to-numbers';
import { Chip, Avatar } from '@material-ui/core';
import NewsCards from "./Components/NewsCards/NewsCards";
import useStyles from './styles';

const alanKey = '249a3a590ed5e19ec8cdc1ea740bb3062e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle(prev => (prev + 1));
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Tha article number was not found. Please try again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening in new tab...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    });
  }, []);

  return (<div className="container">
    <div className={classes.logoContainer}>
      <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
    </div>
    <NewsCards newsArticles={newsArticles} activeArticle={activeArticle} />
    <div className={classes.madeByBadge}>
      <Chip
        avatar={<Avatar>M</Avatar>}
        label="Made By Mayank Singh"
        onClick={() => { }}
        variant="outlined"
      />
    </div>
  </div>);
};

export default App;
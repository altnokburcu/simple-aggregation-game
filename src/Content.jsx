import React, {Component} from 'react';
import Quiz from './Quiz';
import QuizOption from './QuizOption';

class Content extends Component{
  constructor(props){
    super(props);
    }
    render(){
      return(
      <div>
        <Quiz />
      </div>
      );
    }
}

export default Content;

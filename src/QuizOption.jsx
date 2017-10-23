import React, {Component} from 'react';

class QuizOption extends Component{
constructor(props){
super(props);
this.state={};
this.sonucKontrol = this.sonucKontrol.bind(this);
}
sonucKontrol(){
this.props.kontrol(this.props.optionValue);
}
  render(){
    return(
        <div className="fields">
          <div className="field-block" onClick={this.sonucKontrol}>
            {this.props.optionValue}
          </div>
        </div>
    );
  }
}

export default QuizOption;

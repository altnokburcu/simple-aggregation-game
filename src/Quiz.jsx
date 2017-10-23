import React, {Component} from 'react';
import QuizOption from './QuizOption';
import classNames from 'classnames';


class Quiz extends Component{
  constructor(props){
    super(props);
    let soru=this.playGame();
    let correct = false;
    let gameOver = false;
    this.state={
    soru, correct, gameOver
    };
    this.secenekleriYenile=this.secenekleriYenile.bind(this);
    this.kontrolEt=this.kontrolEt.bind(this);
    this.oyna = this.oyna.bind(this);
  }

rastgeleSayi(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min);

}
rastgeleDiziOlustur(toplam){
  let geciciDizi = [];
  let sonucDizi = [];

  while(geciciDizi.length <= 3){
    let rSayi = this.rastgeleSayi(1,19);
    if(geciciDizi.indexOf(rSayi) > -1) continue;
    geciciDizi.push(rSayi);
  }
  for(let i=0 ; i < 3; i++){
    let toplaCikar = this.rastgeleSayi(0,1);
    let sonuc = toplam;
    if(toplaCikar === 1){
    sonuc+=geciciDizi[i];
    sonucDizi.push(sonuc);
    }
    else{
      sonuc-=geciciDizi[i];
      sonucDizi.push(sonuc);

    }

  }
  return sonucDizi;
}

  playGame(){
    let sayi1 = this.rastgeleSayi(20,50);
    let sayi2 = this.rastgeleSayi(20,50);
    let sonuc = sayi1 + sayi2;
    let sonucDizi=this.rastgeleDiziOlustur(sonuc);
    sonucDizi.push(sonuc);
    sonucDizi.sort(function(a,b){return 0.5 - Math.random()}); //karıştırmak için kullanılan metod comparefunction
    let soru={
    secenekler:sonucDizi,
    sayi1:sayi1,
    sayi2:sayi2,
    sonuc:sonuc
    };
    if(this.state && this.state.gameOver){
    this.setState({soru:soru})

    }
    else{

    return soru;
        }
  }
kontrolEt(option){
if(this.state.soru.sonuc === option){
  console.log(option + "Doğru Cevap");
    this.setState({correct:true, gameOver:true})
  }
else{
  console.log(option + "Yanlış Cevap");
    this.setState({correct:false, gameOver:true})
  }
}

  secenekleriYenile(){
  return(
    <div className="options">
      {this.state.soru.secenekler.map((option, i)=>
        <QuizOption optionValue={option} key={i}
        kontrol={(option) => this.kontrolEt(option)} />

      )}
    </div>
  );
  }
  mesajVer(){
  if(this.state.correct){
    return <h3>Doğru Cevap. Devam etmek için aşağıdaki butona basınız.</h3>
      }
  else{
    return <h3>Yanlış Cevap. Devam etmek için aşağıdaki butona basınız.</h3>
      }
  }
  oyna(){
  this.setState({correct:false,gameOver:false});
  this.playGame();
  }

  render(){
    return(
      <div className="quiz">
      <div>
      <p className="question">
      <span className="text-info">
      {this.state.soru.sayi1} ile {this.state.soru.sayi2} nin toplamı kaçtır?</span>
      </p>
      {this.secenekleriYenile()}
        </div>
        <div className={classNames("after", {'hide': !this.state.gameOver}, {'wrong':!this.state.correct},
        {'correct': this.state.correct})}>{this.mesajVer()}</div>
        <div>
        <a className="button" onClick={this.oyna}>Tekrar Oyna</a>
        </div>
      </div>
    );
  }
}

export default Quiz;

import React, { useState, useEffect, Component } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// const Latihan = (props) => {

class Latihan extends Component {

    constructor (props) {
        super(props)
        console.log(props)
        this.state = {
            name : this.props.name,
            question : [],
            currentQuestion : {},
            answer : '',
            numOfQuestion : 0,
            numOfQuestionTemp : 0,
            numOfAnswer : 1,
            currentQuestionIndex : 1,
            score : 0,
            correctAnswer : 0,
            wrongAnswer : 0,
            time:{},
            LoggedIn:false,
        }
    }

    increseCount = () => {
        // console.log(question)
        this.setState({
            counter: 5
        })
    }

    componentDidMount(){
        this.data()
        setTimeout(() => {
            this.displayQuestion(this.state.question, this.state.currentQuestion)
        }, 1000);
    }

    data = async () =>{
        try{
            const res = await axios.get('http://127.0.0.1:8000/api/getSoal')
            const { status, message, data } = res.data
            if(status == 500){
                alert(message)
                return
            }

            // console.log(JSON.parse(data))

            this.setState({
                question : JSON.parse(data)
            })

            // console.log(this.state.question)
        }catch(e){
            alert(e)
        }
    }

    submitFile = async () =>{
        try{
            const scorenew = {score : this.state.score, name : this.state.name}
            const res = await axios.post('http://127.0.0.1:8000/api/updateSiswa', scorenew)
        }catch(e){
            alert(e)
        }
    }

    displayQuestion = (question = this.state.question, currentQuestion ) => {
        let {currentQuestionIndex} = this.state;
        if((this.state.question).length > 0){
            question = this.state.question
            // console.log(question)
            var obj = {}
            question.forEach(element => {
                if(element.id == currentQuestionIndex){
                    obj.question = element.pertanyaan;
                    if(element.pilihan_ganda == "A"){
                        obj.optionA = element.jb;
                        obj.optionUA = element.pilihan_ganda;
                    }
                    if(element.pilihan_ganda == "B"){
                        obj.optionB = element.jb;
                        obj.optionUB = element.pilihan_ganda;
                    }
                    if(element.pilihan_ganda == "C"){
                        obj.optionC = element.jb;
                        obj.optionUC = element.pilihan_ganda;
                    }
                    if(element.pilihan_ganda == "D"){
                        obj.optionD = element.jb;
                        obj.optionUD = element.pilihan_ganda;
                    }
                    obj.answerSelect = element.jawaban;
                }
            });

            currentQuestion = obj
            // currentQuestion = question[currentQuestionIndex]
            const answer = currentQuestion.answerSelect;
            this.setState({
                numOfQuestionTemp : (question.length / 4) + 1,
                currentQuestion,
                answer, 
                numOfQuestion : question.length / 4,
            })
        }


    }

    HandleOnclick = (event) => {
        // return redirect("/");

        // this.props.HistoryRouterProps.push('/')
        // console.log(e.id + " optin")
        const selectedIndex = event.target.id;
        if(selectedIndex == this.state.answer)
        {
            this.CorrectAnswer()
        }else{
            this.WrongAnser()
        }
        // console.log(event.target.options[selectedIndex].getAttribute('data-key'));
    }

    CorrectAnswer = () => {

        alert("bener")
        this.setState(prevState => ({
            score:prevState.score+1,
            correctAnswer: prevState.correctAnswer+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numOfAnswer : prevState.numOfAnswer+1,    
        }), () => {
            this.displayQuestion(this.state.question, this.state.currentQuestion)
        })
        
    }

    WrongAnser = () => {
        navigator.vibrate(1000)
        alert("salah")
        this.setState(prevState => ({
            wrongAnswer: prevState.wrongAnswer+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1,
            numOfAnswer : prevState.numOfAnswer+1,    
        }), () => {
            this.displayQuestion(this.state.question, this.state.currentQuestion)
        })
    }


    render() {
        const { currentQuestion } = this.state
        if (this.props.waktu == 0){
            this.submitFile()
            return(
                <>
                   <div className="container" style={{backgroundColor:"red"}}>
                    <div className="row">
                        <div className="col-md-12" style={{textAlign:"center", marginTop:"50px", fontSize:"30px", fontWeight:"bold", color:"white"}}>
                            Ulangan Telah Selesai
                        </div>
                        <div className="col-md-12" style={{ alignContent:"center", marginTop:"10px"}}>
                            <center>
                            <div class="card" style={{width:"40rem"}}>
                                <div class="card-body">
                                    <h1>Jawaban Benar : {this.state.score}</h1>
                                    <h1>Jawaban Salah : {this.state.numOfQuestion - this.state.score}</h1>
                                    <h1>Hasil nya adalah : {(this.state.score / this.state.numOfQuestion) * 100}</h1>
                                    <button className="btn btn-danger" style={{marginTop:"5px"}}><Link to="/" style={{textDecoration:"none", color:"white"}}>Back</Link></button>
                                    <button className="btn btn-success" style={{marginTop:"5px", marginLeft:"5px"}}><Link to="/list/data" style={{textDecoration:"none", color:"white"}}>Lihat List Data</Link></button>
                                </div>
                            </div>

                            </center>
                        </div>
                    </div>
                </div>
                </>
            )
        }
        if(this.state.numOfAnswer === this.state.numOfQuestionTemp){
            // return this.state.navigate("/");/
            // return this.props.navigate("/");
            this.submitFile()
            return(
                <>
                   <div className="container" style={{backgroundColor:"red"}}>
                    <div className="row">
                        <div className="col-md-12" style={{textAlign:"center", marginTop:"50px", fontSize:"30px", fontWeight:"bold", color:"white"}}>
                            Ulangan Telah Selesai
                        </div>
                        <div className="col-md-12" style={{ alignContent:"center", marginTop:"10px"}}>
                            <center>
                            <div class="card" style={{width:"40rem"}}>
                                <div class="card-body">
                                    <h1>Jawaban Benar : {this.state.score}</h1>
                                    <h1>Jawaban Salah : {this.state.numOfQuestion - this.state.score}</h1>
                                    <h1>Hasil nya adalah : {(this.state.score / this.state.numOfQuestion) * 100}</h1>
                                    <button className="btn btn-danger" style={{marginTop:"5px"}}><Link to="/" style={{textDecoration:"none", color:"white"}}>Back</Link></button>
                                    <button className="btn btn-success" style={{marginTop:"5px", marginLeft:"5px"}}><Link to="/list/data" style={{textDecoration:"none", color:"white"}}>Lihat List Data</Link></button>
                                </div>
                            </div>

                            </center>
                        </div>
                    </div>
                </div>
                </>
            )
        }
        return (
        <>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12" style={{marginTop:"10%", }}>
                    {/* <center> */}
                    
                            <div class="card" style={{width:"40rem", margin:"auto"}}>
                                <div class="card-body" style={{height:"300px"}}>
                                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div>{this.state.numOfAnswer} of {this.state.numOfQuestion}</div>
                                <div class="form-group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg> {this.props.waktu}
                                </div>
                                        </div>
                                <div class="form-group">
                                    <h5>{currentQuestion.question} </h5>
                                </div>
                                <div style={{marginTop:"50px"}}>
                                    <span onClick={this.HandleOnclick} className="btn btn-primary form-control " style={{marginBottom:"5px"}} id={currentQuestion.optionUA} >{currentQuestion.optionA}</span>
                                    <span onClick={this.HandleOnclick} className="btn btn-primary form-control " style={{marginBottom:"5px"}} id={currentQuestion.optionUB}>{currentQuestion.optionB}</span>
                                    <span onClick={this.HandleOnclick} className="btn btn-primary form-control " style={{marginBottom:"5px"}} id={currentQuestion.optionUC}>{currentQuestion.optionC}</span>
                                    <span onClick={this.HandleOnclick} className="btn btn-primary form-control " style={{marginBottom:"5px"}} id={currentQuestion.optionUD}>{currentQuestion.optionD}</span>
                                </div>
                                </div>
                            </div>
        
                            {/* </center> */}
                    </div>
                </div>
            </div>
            
            </>
        )
      }
}


function WithNavigate() {
    const location = useLocation();
    const {state} = location
    console.log(state)
    console.log("Res")
    let navigate = useNavigate();
    const [time, setTime] = useState(180)

    useEffect(() => {
        if (!time){
            return;
        }
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [time]);
    return <Latihan navigate={navigate} waktu={time} name={state}/>
}

export default WithNavigate
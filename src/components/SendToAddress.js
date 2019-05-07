import React from 'react';
import Ruler from "./Ruler";
import Balance from "./Balance";
import cookie from 'react-cookies'
import {CopyToClipboard} from "react-copy-to-clipboard";
import Blockies from 'react-blockies';
import { scroller } from 'react-scroll'
import i18n from '../i18n';
import {
  Box,
  Button,
  OutlineButton,
  Field,
  Input,
} from 'rimble-ui';

const queryString = require('query-string');

const inlineRimbleInput = {
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '16px',
  paddingRight: '16px',
  color: '#3F3D48',
  backgroundColor: '#fff',
  width: '100%',
  height: '3rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  fontSize: '1rem',
  fontFamily: '"Inter-Loom", Helvetica, sans-serif',
  appearance: 'none',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  ':focus': {
    outline: 'none',
    borderColor: '#371bb5',
  },
  ':hover': {
    boxShadow: '0px 2px 6px rgba(0,0,0,0.3)'
  }
}

export default class SendToAddress extends React.Component {

  constructor(props) {
    super(props);



    console.log("!!!!!!!!!!!!!!!!!!!!!!!! window.location.search",window.location.search,parsed)

    let startAmount = props.amount
    if(props.scannerState) startAmount = props.scannerState.amount
    if(!startAmount) {
      startAmount = cookie.load('sendToStartAmount')
    }else{
      cookie.save('sendToStartAmount', startAmount, { path: '/', maxAge: 60 })
    }
    let startMessage= props.message
    if(props.scannerState) startMessage = props.scannerState.message
    if(!startMessage) {
      startMessage = cookie.load('sendToStartMessage')
    }else{
      cookie.save('sendToStartMessage', startMessage, { path: '/', maxAge: 60 })
    }

    let extraMessage = props.extraMessage
    if(props.scannerState) extraMessage = props.scannerState.extraMessage

    let toAddress = ""
    if(props.scannerState) toAddress = props.scannerState.toAddress
    if(!toAddress) {
      toAddress = cookie.load('sendToAddress')
    }else{
      cookie.save('sendToAddress', toAddress, { path: '/', maxAge: 60 })
    }

    let initialState = {
      amount: startAmount,
      message: startMessage,
      toAddress: toAddress,
      extraMessage: extraMessage,
      fromEns: "",
      canSend: false,
    }

    let startingAmount = 0.15
    if(props.amount){
      startingAmount = props.amount
    }
    if(window.location.pathname){
      if(window.location.pathname.length==43){
        initialState.toAddress = window.location.pathname.substring(1)
      }else if(window.location.pathname.length>40) {
      //    console.log("window.location.pathname",window.location.pathname)
      //  console.log("parseAndCleanPath...")
        initialState = Object.assign(initialState,this.props.parseAndCleanPath(window.location.pathname))
      //  console.log("parseAndCleanPath:",initialState)
      }
    }

    const parsed = queryString.parse(window.location.search);
    if(parsed){
      initialState.params = parsed
    }

    this.state = initialState
  //  console.log("SendToAddress constructor",this.state)
    window.history.pushState({},"", "/");



  }

  updateState = async (key, value) => {
    if(key=="amount"){
      cookie.save('sendToStartAmount', value, { path: '/', maxAge: 60 })
    }
    else if(key=="message"){
      cookie.save('sendToStartMessage', value, { path: '/', maxAge: 60 })
    }
    else if(key=="toAddress"){
      cookie.save('sendToAddress', value, { path: '/', maxAge: 60 })
    }
    this.setState({ [key]: value },()=>{
      this.setState({ canSend: this.canSend() },()=>{
        if(key!="message"){
          this.bounceToAmountIfReady()
        }
      })
    });
    if(key=="toAddress"){
      this.setState({fromEns:""})
      //setTimeout(()=>{
      //  this.scrollToBottom()
      //},30)
    }
    if(key=="toAddress"&&value.indexOf(".eth")>=0){
      console.log("Attempting to look up ",value)
      let addr = await this.props.ensLookup(value)
      console.log("Resolved:",addr)
      if(addr!="0x0000000000000000000000000000000000000000"){
        this.setState({toAddress:addr,fromEns:value},()=>{
          if(key!="message"){
            this.bounceToAmountIfReady()
          }
        })
      }
    }
  };
  bounceToAmountIfReady(){
    if(this.state.toAddress && this.state.toAddress.length === 42){
      try {
        this.amountInput.focus();
      }
      catch(error) {
        console.log("error", error);
      }
    }
  }
  componentDidMount(){
    this.setState({ canSend: this.canSend() })
    setTimeout(()=>{
      if(!this.state.toAddress && this.addressInput){
        this.addressInput.focus();
      }else if(!this.state.amount && this.amountInput){
        this.amountInput.focus();
      }else if(this.messageInput){
        this.messageInput.focus();
        setTimeout(()=>{
          this.scrollToBottom()
        },30)
      }
    },350)
  }

  canSend() {
    /*const resolvedAddress = await this.ensProvider.resolveName(this.state.toAddress)
    console.log(`RESOLVED ADDRESS ${resolvedAddress}`)
    if(resolvedAddress != null){
      this.setState({
        toAddress: resolvedAddress
      })
    }*/
    return (this.state.toAddress && this.state.toAddress.length === 42 && (this.state.amount>0 || this.state.message))
  }

  scrollToBottom(){
    console.log("scrolling to bottom")
    scroller.scrollTo('theVeryBottom', {
      duration: 500,
      delay: 30,
      smooth: "easeInOutCubic",
    })
  }

  send = async () => {
    let { toAddress, amount } = this.state;
    let {ERC20TOKEN, dollarDisplay, convertToDollar} = this.props

    amount = convertToDollar(amount)
    console.log("CONVERTED TO DOLLAR AMOUNT",amount)

    if(this.state.canSend){
      if(ERC20TOKEN){
        console.log("this is a token")
      }else{
        console.log("this is not a token")
      }
      console.log("ERC20TOKEN",ERC20TOKEN,"this.props.balance",parseFloat(this.props.balance),"amount",parseFloat(amount))

      if(!ERC20TOKEN && parseFloat(this.props.balance) <= 0){
        console.log("No funds!?!",ERC20TOKEN,parseFloat(this.props.balance))
        this.props.changeAlert({type: 'warning', message: "No Funds."})
      }else if(!ERC20TOKEN && parseFloat(this.props.balance)-0.0001<=parseFloat(amount)){
        let extraHint = ""
        if(!ERC20TOKEN && parseFloat(amount)-parseFloat(this.props.balance)<=.01){
          extraHint = "(gas costs)"
        }
        this.props.changeAlert({type: 'warning', message: 'Not enough funds: '+dollarDisplay(Math.floor((parseFloat(this.props.balance)-0.0001)*100)/100)+' '+extraHint})
      }else if((ERC20TOKEN && (parseFloat(this.props.balance)<parseFloat(amount)))){
        console.log("SO THE BALANCE IS LESS!")
        this.props.changeAlert({type: 'warning', message: 'Not enough tokens: $'+parseFloat(this.props.balance)})
      }else{
        console.log("SWITCH TO LOADER VIEW...",amount)
        this.props.changeView('loader')
        setTimeout(()=>{window.scrollTo(0,0)},60)

        console.log("web3",this.props.web3)
        let txData
        if(this.state.message){
          txData = this.props.web3.utils.utf8ToHex(this.state.message)
        }
        console.log("txData",txData)
        let value = 0
        console.log("amount",amount)
        if(amount){
          value=amount
        }

        cookie.remove('sendToStartAmount', { path: '/' })
        cookie.remove('sendToStartMessage', { path: '/' })
        cookie.remove('sendToAddress', { path: '/' })

        this.props.send(toAddress, value, 120000, txData, (result) => {
          if(result && result.transactionHash){
            this.props.goBack();
            window.history.pushState({},"", "/");
            /*
            this.props.changeAlert({
              type: 'success',
              message: 'Sent! '+result.transactionHash,
            });*/

            let receiptObj = {to:toAddress,from:result.from,amount:parseFloat(amount),message:this.state.message,result:result}


            if(this.state.params){
              receiptObj.params = this.state.params
            }

          //  console.log("CHECKING SCANNER STATE FOR ORDER ID",this.props.scannerState)
            if(this.props.scannerState&&this.props.scannerState.daiposOrderId){
              receiptObj.daiposOrderId = this.props.scannerState.daiposOrderId
            }

            //console.log("SETTING RECEPITE STATE",receiptObj)
            this.props.setReceipt(receiptObj)
            this.props.changeView("receipt");
          }
        })
      }
    }else{
      this.props.changeAlert({type: 'warning', message: i18n.t('send_to_address.error')})
    }
  };

  render() {
    let { canSend, toAddress } = this.state;
    let {dollarSymbol} = this.props

    /*let sendMessage = ""
    if(this.state.message){
      sendMessage = (
        <div className="form-group w-100">
          <label htmlFor="amount_input">For</label>
          <div>
            {decodeURI(this.state.message)}
          </div>
        </div>
      )
    }*/

    let messageText = "Message"
    if(this.state.extraMessage){
      messageText = this.state.extraMessage
    }


    let amountInputDisplay = (
      <input
        width={1}
        type="number"
        placeholder="0"
        value={this.state.amount}
        style={inlineRimbleInput}
        ref={(input) => { this.amountInput = input; }}
        onChange={event => this.updateState('amount', event.target.value)}
        required
      />
    )
    if(this.props.scannerState&&this.props.scannerState.daiposOrderId){
      amountInputDisplay = (
        <input
          width={1}
          type="number"
          readOnly
          placeholder="0"
          value={this.state.amount}
          ref={(input) => { this.amountInput = input; }}
          onChange={event => this.updateState('amount', event.target.value)}
        />
      )
    }

    return (
      <div>
        <Box mb={4}>
          <Field mb={3} label={i18n.t('send_to_address.to_address')}>
            <Input
              width={1}
              type="text"
              placeholder="0x..."
              value={this.state.toAddress}
              ref={(input) => { this.addressInput = input; }}
              onChange={event => this.updateState('toAddress', event.target.value)}
              required
            />
          </Field>

          <OutlineButton icon={'CenterFocusWeak'} mb={4} width={1} onClick={() => {this.props.openScanner({view:"send_to_address"})}}>
            Scan QR Code
          </OutlineButton>

          <div>{ this.state.toAddress && this.state.toAddress.length==42 &&
            <CopyToClipboard text={toAddress.toLowerCase()}>
              <div style={{cursor:"pointer"}} onClick={() => this.props.changeAlert({type: 'success', message: toAddress.toLowerCase()+' copied to clipboard'})}>
                <div style={{opacity:0.33}}>{this.state.fromEns}</div>
                <Blockies seed={toAddress.toLowerCase()} scale={10}/>
              </div>
            </CopyToClipboard>
          }</div>

          <Field mb={3} label={i18n.t('send_to_address.send_amount')}>
            {amountInputDisplay}
          </Field>

          <Field mb={3} label={messageText}>
            <Input
              width={1}
              type="text"
              placeholder="optional unencrypted message"
              value={this.state.message}
              ref={(input) => { this.messageInput = input; }}
              onChange={event => this.updateState('message', event.target.value)}
              required
            />
          </Field>
        </Box>
        <Button size={'large'} width={1} disabled={canSend === false} onClick={this.send}>
          Send
        </Button>
      </div>
    )
  }
}

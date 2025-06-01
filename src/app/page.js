'use client';
import { useState } from 'react';


export default function Home() {
  const [type, setType] = useState('--')
  const [prompt, setPrompt] = useState('')
  const [binary, setBinary] = useState('')
  const [hex, setHex] = useState('')
  const [decimal, setDecimal] = useState('')
  const [validInput, setValidInput] = useState(false)
  const [invalidMess, setInvalidMess] = useState("please choose a type")

  const changeType = (e) => {
    setType(e.target.value)
    changing(e.target.value, prompt)
  }
  const changePrompt = (e) => {
    setPrompt(e.target.value)
    changing(type, e.target.value)
  }
  const invalid = (empty) => {
    setValidInput(false)
    if (empty) {setInvalidMess("please enter a value")}
    else {setInvalidMess("invalid input")}
  }
  const toolong = () => {
    setBinary("too long")
    setDecimal("too long")
    setHex("too long")
  }


  const [validRisc, setValidRisc] = useState(false)
  const [invalidRiscmessage, setInvalidRiscmessage] = useState('please enter a value')
  const [risctype, setRiscType] = useState('')
  const [messdecode, setMessdecode] = useState('')
  const [instr, setInstr] = useState('')

  const findriscv = (binval, realbinval) => {
    if (realbinval.length <= 32) {
      //meep
      let opcode = binval.slice(25,32)
      let rd = binval.slice(20,25)
      let funct3 = binval.slice(17,20)
      let rs1 = binval.slice(12,17)
      let rs2 = binval.slice(7, 12)
      let funct7 = binval.slice(0, 7)
      setValidRisc(true)
      switch (opcode) {
        case '0110011': //R type
          setRiscType('R')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-25</p>
              <p className="instrb">{funct7}</p>
              <p className="instrc">funct7</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">24-20</p>
              <p className="instrb">{rs2}</p>
              <p className="instrc">rs2</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '0010011': //I type, must change later to differentiate I* type
          if (binval.slice(18, 20) == '01') {
            setRiscType('I*')
            setMessdecode(<div className="instrdecodefullbox">
              <div className="instrdecodebox">
              <p className="instra">31-25</p>
              <p className="instrb">{funct7}</p>
              <p className="instrc">funct7</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">24-20</p>
              <p className="instrb">{rs2}</p>
              <p className="instrc">imm[4:0]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
            if (funct3[0] == '0') {
              if (funct7 == '0000000') {setInstr('slli')}
              else {
                setValidRisc(false)
                setInvalidRiscmessage('invalid funct7 for slli. got ' + funct7 + ' but should be 0000000') //TODO: could be improved where decode is still shown but funct7 is in red w error message
              }
            } else if (funct7 == '0000000') {
              setInstr('srli')
            } else if (funct7 == '0100000') {
              setInstr('srai')
            } else {
              setValidRisc(false)
              setInvalidRiscmessage('invalid funct7 for I*. srli is 0000000 and srai is 0100000 but got ' + funct7)
            }
            return;
          }
          setRiscType('I')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-20</p>
              <p className="instrb">{funct7 + rs2}</p>
              <p className="instrc">imm[11:0]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '0000011': //I type for load memory
          setRiscType('I')
          setInstr('some kind of load')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-20</p>
              <p className="instrb">{funct7 + rs2}</p>
              <p className="instrc">imm[11:0]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '1100111': //I type for jalr instr
          setRiscType('I')
          setInstr('jalr')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-20</p>
              <p className="instrb">{funct7 + rs2}</p>
              <p className="instrc">imm[11:0]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '1110011': //I type for ebreak or ecall
          setInstr('ebreak or ecall')
          setRiscType('I')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-20</p>
              <p className="instrb">{funct7 + rs2}</p>
              <p className="instrc">imm[11:0]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '0100011':
          setRiscType('S')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-25</p>
              <p className="instrb">{funct7}</p>
              <p className="instrc">imm[11:5]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">24-20</p>
              <p className="instrb">{rs2}</p>
              <p className="instrc">rs2</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">imm[4:0]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '1100011':
          setRiscType('B')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-25</p>
              <p className="instrb">{funct7}</p>
              <p className="instrc">imm[12|10:5]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">24-20</p>
              <p className="instrb">{rs2}</p>
              <p className="instrc">rs2</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">19-15</p>
              <p className="instrb">{rs1}</p>
              <p className="instrc">rs1</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">14-12</p>
              <p className="instrb">{funct3}</p>
              <p className="instrc">funct3</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">imm[4:1|11]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '1101111':
          setRiscType('J')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-12</p>
              <p className="instrb">{funct7 + rs2 + rs1 + funct3}</p>
              <p className="instrc">imm[20|10:1|11|19:12]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '0010111': //U type for auipc
          setRiscType('U')
          setInstr('auipc')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-12</p>
              <p className="instrb">{funct7 + rs2 + rs1 + funct3}</p>
              <p className="instrc">imm[31:12]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        case '0110111': //U type for lui
          setInstr('lui')
          setRiscType('U')
          setMessdecode(<div className="instrdecodefullbox">
            <div className="instrdecodebox">
              <p className="instra">31-12</p>
              <p className="instrb">{funct7 + rs2 + rs1 + funct3}</p>
              <p className="instrc">imm[31:12]</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">11-7</p>
              <p className="instrb">{rd}</p>
              <p className="instrc">rd</p>
            </div>
            <div className="instrdecodebox">
              <p className="instra">6-0</p>
              <p className="instrb">{opcode}</p>
              <p className="instrc">opcode</p>
            </div></div>)
          break
        default:
          setValidRisc(false)
          setInvalidRiscmessage('invalid opcode of ' + opcode)
      }
    } else {
      setValidRisc(false)
      setInvalidRiscmessage('cannot be greater than 32 bits length')
    }
  }
  const changing = (type, value) => {
    if (type == '--') {
      setValidInput(false)
      setInvalidMess("please choose a type")
      return;
    }
    if (value == "") {
      invalid(true)
      return;
    }
    setValidInput(true)
    switch (type) {
      case '0x':
        if (/^[0-9A-Fa-f]+$/.test(value)) {
          if (value.length < 14) {
            let number = parseInt(value, 16);
            let paddedBinary = number.toString(2).padStart(Math.ceil(number.toString(2).length / 4) * 4, '0');
            setBinary(paddedBinary.replace(/.{1,4}/g, '$& ').trim());
            setDecimal(number.toString(10));
            setHex(value.toUpperCase());
            findriscv(number.toString(2).padStart(32, '0'), number.toString(2));
          } else {toolong()}
        } else {invalid(false)}
        break;
      case '0b':
        if (/^[0-1]+$/.test(value)) {
          if (value.length < 53) {
            let number = parseInt(value, 2)
            let paddedBinary = value.padStart(Math.ceil(value.length / 4) * 4, '0')
            findriscv(number.toString(2).padStart(32, '0'), number.toString(2))
            setBinary(paddedBinary.replace(/.{1,4}/g, '$& ').trim())
            setDecimal(number.toString(10))
            setHex(number.toString(16).toUpperCase())
          } else {toolong()}
        } else {invalid(false)}
        break;
      case '0d':
        if (/^[0-9]+$/.test(value)) {
          if (value.length < 16) {
            let number = parseInt(value, 10)
            let paddedBinary = number.toString(2).padStart(Math.ceil(number.toString(2).length / 4) * 4, '0')
            findriscv(number.toString(2).padStart(32, '0'), number.toString(2))
            setBinary(paddedBinary.replace(/.{1,4}/g, '$& ').trim())
            setDecimal(value)
            setHex(number.toString(16).toUpperCase())
          } else {toolong()}
        } else {invalid(false)}
        break;
      case '--':
        setBinary("select type")
        setDecimal("select type")
        setHex("select type")
        break;
    }
  }


  return (
    <div className="mainholder">
    <h1>Hex Binary Decimal Converter & RISCV Decoder</h1>

    <div className="inputcontainer">
      <select value={type} onChange={changeType} required>
        <option>--</option>
        <option>0x</option>
        <option>0b</option>
        <option>0d</option>
      </select>
      <input type="text" value={prompt} onChange={changePrompt}></input>
    </div>
    
    {validInput ? (<div className="outputbox">
      <div className="bhdbox">
        <div className="bhdlabel">
          <p>binary:</p>
          <p>hex:</p>
          <p>decimal:</p>
        </div>
        <div className="bhdcontentbox">
          <p>{binary}</p>
          <p>{hex}</p>
          <p>{decimal}</p>
        </div>
      </div>
      {validRisc ? (
        <div className="riscbox"><div className="instrdecodetopbox">
        <p>{risctype} Type</p><p>instr: {instr}</p></div>{messdecode}</div>
      ):(<div className="riscbox"><p>invalid riscv: {invalidRiscmessage}</p></div>)}
    </div>):(<div className="invalidbox"><p>{invalidMess}</p></div>)}
    
    </div>
  );
}

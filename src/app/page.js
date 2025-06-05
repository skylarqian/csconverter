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
  const convertreg = (bin) => {
    let num = parseInt(bin, 2)
    switch (num) {
      case 0:
        return 'x0(zero)'
      case 1:
        return 'x1(ra)'
      case 2:
        return 'x2(sp)'
      case 3:
        return 'x3(gp)'
      case 4:
        return 'x4(tp)'
      case 5:
        return 'x5(t0)'
      case 6:
        return 'x6(t1)'
      case 7:
        return 'x7(t2)'
      case 8:
        return 'x8(s0)'
      case 9:
        return 'x9(s1)'
      case 10:
        return 'x10(a0)'
      case 11:
        return 'x11(a1)'
      case 12:
        return 'x12(a2)'
      case 13:
        return 'x13(a3)'
      case 14:
        return 'x14(a4)'
      case 15:
        return 'x15(a5)'
      case 16:
        return 'x16(a6)'
      case 17:
        return 'x17(a7)'
      case 18:
        return 'x18(s2)'
      case 19:
        return 'x19(s3)'
      case 20:
        return 'x20(s4)'
      case 21:
        return 'x21(s5)'
      case 22:
        return 'x22(s6)'
      case 23:
        return 'x23(s7)'
      case 24:
        return 'x24(s8)'
      case 25:
        return 'x25(s9)'
      case 26:
        return 'x26(s10)'
      case 27:
        return 'x27(s11)'
      case 28:
        return 'x28(t3)'
      case 29:
        return 'x29(t4)'
      case 30:
        return 'x30(t5)'
      case 31:
        return 'x31(t6)'
      default:
        console.log('should not appear')
    }
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
          if (funct7 != "0000000" && funct7 != "0100000") {
            setValidRisc(false)
            setInvalidRiscmessage("invalid funct7 for R type: you have " + funct7 + " but must be 0000000 or 0100000")
            return
          }
          if (funct7 == "0000000") {
            switch (funct3) {
              case '000': //ADD
                setInstr("add " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break;
              case '111': //AND
                setInstr("and " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '110': //OR
                setInstr("or " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '100': //XOR
                setInstr("xor " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '001': //SLL
                setInstr("sll " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '101': //SRL
                setInstr("srl " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '010': //SLT
                setInstr("slt " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '011': //SLTU
                setInstr("sltu " + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              default:
                setValidRisc(false)
                setInvalidRiscmessage("invalid funct3 for R type with 000 0000 funct7")
                return
            }
          }
          if (funct7 == "0100000") {
            switch (funct3) {
              case '000': //sub
                setInstr('sub ' + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              case '101': //sra
                setInstr('sra ' + convertreg(rd) + " " + convertreg(rs1) + " " + convertreg(rs2))
                break
              default:
                setValidRisc(false)
                setInvalidRiscmessage("invalid funct3 for R type with 010 0000 funct7")
                return
            }
          }
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
        case '0010011': //I type
          if (binval.slice(18, 20) == '01') {
            setRiscType('I*')
            switch (funct3) {
              case '001': //SLLI
                if (funct7 == '0000000') {
                  setInstr('slli ' + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(rs2, 2))
                  break
                } else {
                  setValidRisc(false)
                  setInvalidRiscmessage('funct7 must be 0000000 for slli')
                  return
                }
                break
              case '101': //SRAI or SRLI
                switch (funct7) {
                  case '0000000':
                    //SRLI
                    setInstr('srli ' + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(rs2, 2))
                    break
                  case '0100000':
                    //SRAI
                    setInstr('srai ' + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(rs2, 2))
                    break
                  default:
                    setValidRisc(false)
                    setInvalidRiscmessage('given the funct3, funct7 must be 0000000 (srli) or 0100000 (srai)')
                    return
                }
                break
              default:
                setValidRisc(false)
                setInvalidRiscmessage('invalid funct3 for I* type')
                return
            }
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
            return;
          }
          setRiscType('I')
          switch (funct3) {
            case '000': //ADDI
              setInstr("addi " + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
              break
            case '111': //ANDI
              setInstr("andi " + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
              break
            case '110': //ori
              setInstr("ori " + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
              break
            case '100': //xori
              setInstr("xori " + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
              break
            case '010': //slti
              setInstr("slti " + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
              break
            case '011': //sltiu
              setInstr("sltiu " + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
              break
            default:
              setValidRisc(false)
              setInvalidRiscmessage("invalid funct3 for type I with opcode 0010011")
              return
          }
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
          switch (funct3) {
            case '000': //LB
              setInstr("lb " + convertreg(rd) + ' ' + parseInt(funct7 + rs2, 2) + '(' + convertreg(rs1) + ')')
              break
            case '100': //LBU
              setInstr("lbu " + convertreg(rd) + ' ' + parseInt(funct7 + rs2, 2) + '(' + convertreg(rs1) + ')')
              break
            case '001': //LH
              setInstr("lh " + convertreg(rd) + ' ' + parseInt(funct7 + rs2, 2) + '(' + convertreg(rs1) + ')')
              break
            case '101': //LHU
              setInstr("lhu " + convertreg(rd) + ' ' + parseInt(funct7 + rs2, 2) + '(' + convertreg(rs1) + ')')
              break
            case '010': //LW
              setInstr("lw " + convertreg(rd) + ' ' + parseInt(funct7 + rs2, 2) + '(' + convertreg(rs1) + ')')
              break
            default:
              setValidRisc(false)
              setInvalidRiscmessage("invalid funct3 for I type with 0000011 funct7")
              return
          }
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
          if (funct3 != '000') {
            setValidRisc(false)
            setInvalidRiscmessage("jalr inst must have funct3 of 000")
            return
          }
          setInstr('jalr' + convertreg(rd) + ' ' + convertreg(rs1) + ' ' + parseInt(funct7 + rs2, 2))
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
          if (funct3 != '000') {
            setValidRisc(false)
            setInvalidRiscmessage('ecall or ebreak must have funct3 of 000')
            return
          }
          setRiscType('I')
          let imm = parseInt(funct7 + rs2, 2)
          switch (imm) {
            case 0:
              setInstr('ebreak')
              break
            case 1:
              setInstr('ecall')
              break
            default:
              setValidRisc(false)
              setInvalidRiscmessage('imm must be 0 for ebreak or 1 for ecall')
              return
          }
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
          let imms = parseInt(funct7 + rd, 2)
          switch (funct3) {
            case '000': //SB
              setInstr('sb ' + convertreg(rs2) + ' ' + imms + '(' + convertreg(rs1))
              break;
            case '001': //SH
              setInstr('sh ' + convertreg(rs2) + ' ' + imms + '(' + convertreg(rs1))
              break;
            case '010': //SW
              setInstr('sw ' + convertreg(rs2) + ' ' + imms + '(' + convertreg(rs1))
              break;
            default:
              setValidRisc(false)
              setInvalidRiscmessage('invalid funct3 for S type')
              return
          }
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
          let immb = parseInt(funct7[0] + rd[4] + funct7.slice(1, 7) + rd.slice(0, 4) + '0', 2)
          switch (funct3) {
            case '000': //BEQ
              setInstr('beq ' + convertreg(rs1) + ' ' + convertreg(rs2) + ' ' + imm)
              break
            case '001': //BNE
              setInstr('bne ' + convertreg(rs1) + ' ' + convertreg(rs2) + ' ' + imm)
              break
            case '100': //BLT
              setInstr('blt ' + convertreg(rs1) + ' ' + convertreg(rs2) + ' ' + imm)
              break
            case '110': //BLTU
              setInstr('bltu ' + convertreg(rs1) + ' ' + convertreg(rs2) + ' ' + imm)
              break
            case '111': //BGEU
              setInstr('bgeu ' + convertreg(rs1) + ' ' + convertreg(rs2) + ' ' + imm)
              break
            default:
              setValidRisc(false)
              setInvalidRiscmessage('invalid funct3 for B type')
              return
          }
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
          let immj = parseInt(funct7[0] + rs1 + funct3 + rs2[4] + funct7.slice(1, 7) + rs2.slice(0, 4) + '0', 2)
          setInstr('jal ' + convertreg(rd) + ' ' + immj)
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
        case '0110111': //U type for lui
          setRiscType('U')
          let immu = parseInt(funct7 + rs2 + rs1 + funct3 + '000000000000', 2)
          if (opcode == '0010111') {
            setInstr('auipc ' + convertreg(rd) + ' ' + immu)
          } else {
            setInstr('lui ' + convertreg(rd) + ' ' + immu)
          }
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
  const [copiedbinary, setCopiedbinary] = useState(false);
  const handleCopybinary = async () => {
    try {
      await navigator.clipboard.writeText(binary);
      setCopiedbinary(true);
      setTimeout(() => setCopiedbinary(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  const [copiedhex, setCopiedhex] = useState(false);
  const handleCopyhex = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedhex(true);
      setTimeout(() => setCopiedhex(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  const [copieddecimal, setCopieddecimal] = useState(false);
  const handleCopydecimal = async () => {
    try {
      await navigator.clipboard.writeText(decimal);
      setCopieddecimal(true);
      setTimeout(() => setCopieddecimal(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };


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
        <div className="bhdcontentbox">
          <button onClick={handleCopybinary}>{copiedbinary ? 'Copied!' : 'Copy'}</button>
          <button onClick={handleCopyhex}>{copiedhex ? 'Copied!' : 'Copy'}</button>
          <button onClick={handleCopydecimal}>{copieddecimal ? 'Copied!' : 'Copy'}</button>
        </div>
      </div>
      {validRisc ? (
        <div className="riscbox"><div className="instrdecodetopbox">
        <p>{risctype} Type</p><p className="instrtext">{instr}</p></div>{messdecode}</div>
      ):(<div className="riscbox"><p>invalid riscv: {invalidRiscmessage}</p></div>)}
    </div>):(<div className="invalidbox"><p>{invalidMess}</p></div>)}
    
    </div>
  );
}

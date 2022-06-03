import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [number, setNumber]= useState(0);
  const [button, setButton] = useState('GO');
  const [last, setLast] = useState(null);

  function go() {
    if(timer !== null) {
      //Aqui vai parar o timer
      clearInterval(timer);
      timer = null;
      setButton('GO');
    } else {
      //Começar a girar o timer
      timer = setInterval(() => {
        ss++;

        if(ss == 60) {
          ss = 0;
          mm++;
        }

        if(mm == 60) {
          mm = 0;
          hh++;
        }

        let format = 
        (hh < 10 ? '0' + hh: hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss);

        setNumber(format);
      }, 100);
      setButton('STOP');
    }
  }

  function clear() {
    if (timer !== null) {
      //Para o timer!
      clearInterval(timer);
      timer = null;

      setLast(number);

      setNumber(0);
      ss = 0;
      mm = 0;
      hh = 0;
      setButton('GO');
    }
  }

  return(
    <View style={styles.container}>
      <Image style={styles.img} source={require('./src/cronometro.png')} />

      <Text style={styles.timer}>{number}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={go}>
          <Text style={styles.btnTexto}>{button}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={clear}>
          <Text style={styles.btnTexto}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.lastArea}>
        <Text style={styles.textRun}>
          { last ? 'Last time: ' + last: ''}
        </Text>
      </Text>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef', 
  },
  img: {
    width: 400,
    height: 400
  },
  timer: {
    marginTop: -200,
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 160,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 20
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  lastArea: {
    marginTop: 40
  },
  textRun: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic'
  }
})

import React, {useState, useEffect} from 'react'
import "./WordCount.css"
import {Container, Button} from "react-bootstrap"
import {Chart} from "react-google-charts"

const WordCount = () => {
    const [totalWords, setTotalWords] = useState(0)
    const [totalCharacters, setTotalCharacters] = useState(0)
    const [paragraphs, setParagraphs] = useState(1)
    const [swl, setSwl] = useState(false)
    const [mfw, setMfw] = useState({name: "", ocurency: 0})
    const [data, setData] = useState([mfw.name, mfw.ocurency])
    const [paragraph, setParagraph] = useState("")

    useEffect(() => {
        generateWords()
        paragraphToArray(paragraph)
    }, [])

    const paragraphToArray = (pParagraph) => {
        var tempTotalWord = getTotalWords(pParagraph)
        var max  = 0
        var tempArray = []
        Object.keys(tempTotalWord).forEach(element => {
            tempArray.push({name: element, ocurency: tempTotalWord[element]})
        })
        tempArray.forEach(element => {
            if (element.ocurency > max) {
              max = element.ocurency;
              setMfw ({
                  name: element.name,
                  ocurency: element.ocurency
              })
            }
          });
    }

    const getTotalWords = (pParagraph) => pParagraph
        .replace(/[.,?!;()"'-]/g, " ")
        .replace(/\s+/g, " ")
        .toLowerCase()
        .split(" ")
        .reduce((index, word) => {
          if (!(index.hasOwnProperty(word))) index[word] = 0;
          index[word]++;
          return index
    }, {});

    const getTotalCharacters = (pParagraph) => {
        var cleanNewParagraph = pParagraph.replace(/[.,?!;()"'-]/g, " ")
        return cleanNewParagraph.length
    }

    const generateWords = () => {
        fetch(`https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}&start-with-lorem=${swl ? 1 : 0 }`)
        .then(res => res.json())
        .then(data => {
            if(data.length > 1) {
                var tempTotalWords = {}
                var tempTotalCharacters = 0
                var tempParagraph = ""
                data.forEach(element => {
                    tempTotalWords = Object.assign(tempTotalWords, getTotalWords(element))
                    tempTotalCharacters = tempTotalCharacters + getTotalCharacters(element)
                    tempParagraph = tempParagraph.concat(element) 
                });
                setParagraph(tempParagraph)
                paragraphToArray(tempParagraph)
                setTotalCharacters(tempTotalCharacters)
                setTotalWords(Object.keys(tempTotalWords).length)
                setData([mfw.name, mfw.ocurency])
            } else if(data.length === 1) {
                var tempTotalWord = getTotalWords(data[0])
                var tempTotalCharacter = getTotalCharacters(data[0])
                setParagraph(data[0])
                paragraphToArray(data[0])
                setTotalWords(Object.keys(tempTotalWord).length)
                setTotalCharacters(tempTotalCharacter)
                setData([mfw.name, mfw.ocurency])
            }
        })
    }

    return (
        <Container className="wordCount">
            <Container className="wordCount__counters">
                <p>TOTAL WORDS: {totalWords}</p>
                <p>TOTAL CHARACTERS: {totalCharacters}</p>
            </Container>
            <Container className="wordCount__histogram">
                <h3>HISTOGRAM TOP WORD:</h3>
                <Chart
                    width={'700px'}
                    height={'300px'}
                    chartType="Histogram"
                    loader={<div>Loading The &#129363;</div>}
                    data={[
                        ['Word', 'Quantity'],
                        data
                    ]}
                />
            </Container>
            <Container className="wordCount__options">
                <Container className="wordCount__option">
                    <h3>#PARAGRAPHS: </h3>
                    <input type="number" placeholder="# paragraphs" value={paragraphs} onChange={(e) => setParagraphs(e.target.value) } />
                </Container>
                <Container className="wordCount__option">
                    <h3>STARTS WITH LOREM</h3>
                    <input type="checkbox" checked={swl}  onChange={(e) => setSwl(e.target.checked) }  />
                </Container>
                <Button className="wordCount__optionsButton" onClick={generateWords}>GENERATE!</Button>
            </Container>
            <Container className="wordCount__paragraph">
                <p>{paragraph}</p>
            </Container>
        </Container>
    )
}

export default WordCount

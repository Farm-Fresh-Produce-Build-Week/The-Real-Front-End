import React from "react"; 
import lambs from "../Images/lambs.jpg"; 
import styled from "styled-components"; 
import barn3 from "../Images/Farmer/barn3.jpg"; 
import { NavLink } from "react-router-dom"; 

const FarmCard = props => {
    return (
        <>
        <div className="Farm-Page">
        <NavLink to="/shopping"> <button> Go Shopping </button></NavLink>
        <NavLink to="/dashboard-customer"><button> Dashboard </button></NavLink>
            <div className="Top-Section">
                <StyledImg src={barn3} alt="farm"/>
                <h2> Farm's Name </h2>
                <h4> Farmer's Name </h4>
            </div>
            <div className="About">
                <p> Celery quandong swiss chard chicory earthnut pea potato. 
                    lsify taro catsear garlic gram celery bitterleaf wattle seed
                    collard greens nori. Grape wattle seed kombu beetroot horseradish
                    carrot squash brussels sprout chard. Pea horseradish azuki bean
                    lettuce avocado asparagus okra. Kohlrabi radish okra azuki bean corn
                    fava bean mustard tigernut jícama green bean celtuce collard greens 
                    avocado quandong fennel gumbo black-eyed pea. Grape silver beet watercress
                    potato tigernut corn groundnut. Chickweed okra pea winter purslane
                    coriander yarrow sweet pepper radish garlic brussels sprout groundnut 
                    summer purslane earthnut pea tomato spring onion azuki bean gourd. Gumbo
                    kakadu plum komatsuna black-eyed pea green bean zucchini gourd winter purslane
                    silver beet rock melon radish asparagus spinach. Beetroot water spinach okra
                    water chestnut ricebean pea catsear courgette summer purslane. Water spinach
                    arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory
                    salsify pea sprouts fava bean. Dandelion zucchini burdock yarrow chickpea dandelion
                    sorrel courgette turnip greens tigernut soybean radish artichoke wattle seed endive
                    groundnut broccoli arugula.</p>
                    <Styled src={lambs} alt="lambs" />
            </div>
        </div>
        </>
    )
}

export default FarmCard; 

const StyledImg = styled.img`
height: 250px; 
`

const Styled = styled.img`
height: 150px; 
`
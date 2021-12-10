import Malt from "./Malt.jsx"

const MaltList = ({ malts }) => {
    <ul>
        {malts.map((item, index) => (
            <Malt key={index} item={item} />
        ))}
    </ul>
}

export default MaltList
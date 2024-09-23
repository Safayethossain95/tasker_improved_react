import { getImgUrl } from "../utils/getImgUrl"


const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 navbar w-screen bg-[#191D26]">
        <div className="p-6 container">
            <img src={getImgUrl("lws-logo-en.svg")} alt="" />
        </div>
    </div>
  )
}

export default Navbar
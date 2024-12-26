import "./App.css";
import { useState } from "react";
import Picture from "./Components/Picture.jsx";
function App() {
  const [word, setWord] = useState("");
  const [photos, setPhotos] = useState([]);
  function SearchImg(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาป้อนข้อมูล");
    } else {
      //api
      fetchImageFromAPI();
    }
  }
  async function fetchImageFromAPI() {
    //ต้องรอให้ดึงข้อมูลรูปภาพทั้งหมดก่อน ก่อนที่จะนำข้อมูลมาใช้
    const URL = `${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;
    const res = await fetch(URL); //ดึงมาแล้วเก็บก้อนข้อมูลใน res
    const data = await res.json();
    const result = data.results;
    if (result.length == 0) {
      alert("ไม่มีรูปภาพที่ต้องการ");
      setWord("");
    } else {
      setPhotos(result);
    }
  }
  return (
    <div className="min-h-screen bg-sky-200 flex flex-col items-center py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">ระบบค้นหารูปภาพด้วย API</h1>
        <form onSubmit={SearchImg} className="w-[90%] max-w-[600px] h-[100px] flex items-center bg-blue-600 rounded-t rounded-b justify-center p-[40px]">
          <input
            onChange={(e) => {
              setWord(e.target.value);
            }}
            value={word}
            type="text"
            name="text"
            id="text"
            placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
            className="flex-grow p-[20px] rounded-l bg-white outline-none"
          />
          <button type="submit" className="p-[20px] bg-blue-800 text-white rounded-r outline-0 border-0 hover:bg-blue-700">
            ค้นหา
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-[80%] mx-auto gap-[20px]">
        {photos.map((data, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md border border-gray-200 aspect-[3/2]">
            <img src={data.urls.small} alt={data.description} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

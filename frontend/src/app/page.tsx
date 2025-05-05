"use client";
export default function Home() {

  const handleClick = () => {
    fetch('/api/v1/').then((res) => {
      if (res.ok) {
        console.log("ok");
        res.text().then((text) => {
          alert(text);
        })
      } else {
        console.log("not ok");
      }
    }
    ).catch((err) => {
      console.log("error", err);
    })
  };

  return (
    <div>
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

function picture(props) {
  return (
    <>
      <img src={props.urls.small} alt={props.description} className="w-[100%] h-[250px] object-cover rounded-md"></img>
    </>
  );
}

export default picture;

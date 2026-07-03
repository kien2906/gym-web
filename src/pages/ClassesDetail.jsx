import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getClasses, { getClassesId } from "../api/apiClassess";

function ClassesDetail() {
  const { id } = useParams();
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    const getClasses = async () => {
      const data = await getClassesId(id);

      setClasses(data);
    };
    getClasses();
  }, [id]);
  console.log(id);
  console.log(classes);

  return (
    <>
      <div>
        <img src={classes?.image} alt={classes?.name} />
        <h1>{classes?.name}</h1>
        <p>{classes?.description}</p>
        <h3>${classes?.price}</h3>
      </div>
    </>
  );
}

export default ClassesDetail;

// useParam dùng để lấy các tham số (params) trên URL.
// example lấy id

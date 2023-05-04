import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box, Spinner, Badge, Text } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";

function SpaandTreatment({x}) {
  const MySwal = withReactContent(Swal);
  const [spaData, setspaData] = useState([]);
  const handleData = async (item) => {
    item.price = item.nonmemberprice;
    item.serviceType = "spaandtreatment";
    let token = localStorage.getItem("token");
    if (token) {
      let response = await fetch("https://hairdocbackend.onrender.com/cart", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (data.msg === "Item already exists") {
        MySwal.fire({
          icon: "error",
          title: `Can't book same service on the same day`,
        });
      } else {
        x()
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Item added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: `Please Login to add items to Cart`,
      });
    }
  };
  useEffect(() => {
    axios
      .get("https://sleepy-foal-waders.cyclic.app/men/spa/")
      //   .then(res=> console.log(res.data))
      .then((res) => setspaData(res.data));
  }, []);

  return (
    <div
      className="main"
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        flexBasis: "200px",
        margin: "2rem",
        justifyContent: "center",
      }}
    >
      {spaData.length > 0 ? (
        spaData.map((item) => {
          return (
            <>
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                w="300px"
                p="1%"
              >
                <Box
                  h="100%"
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-around"}
                >
                  <Box display="flex" justifyContent={"space-around"}>
                    <Badge
                      borderRadius="full"
                      px="2"
                      colorScheme="teal"
                      display={"flex"}
                      alignItems="center"
                      w="20%"
                    >
                      <AiOutlineStar />
                      {item.rating}
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="sm"
                      textTransform="uppercase"
                      ml="2"
                    >
                      Price : ₹{item.memberprice}
                    </Box>
                  </Box>

                  <Box>
                    <Text fontSize="md">{item.name}</Text>
                  </Box>

                  <Box height="40px">
                    <button
                      style={{
                        width: "100%",
                        bottom: "0%",
                        borderRadius: "4px",
                        backgroundColor: "rgb(49,130,206)",
                        color: "white",
                        height: "100%",
                      }}
                      onClick={() => {
                        handleData(item);
                      }}
                    >
                      Add to Cart
                    </button>
                  </Box>
                </Box>
              </Box>
            </>
          );
        })
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </div>
  );
}

export default SpaandTreatment;

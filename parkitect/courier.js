const { CourierClient } = require("@trycourier/courier");
export const courier = CourierClient({
  authorizationToken: "dk_test_M8E7SHQRMXMK9KMPM5QREF7V6TYA",
});

// const { requestId } = await courier.send({
//   message: {
//     to: {
//       email: "anashaynyuk2022@gmail.com",
//     },
//     template: "3YV5SV1Q1YM3C7KPVNNDBEBVHHJX",
//     data: {
//       firstName: "firstName",
//       location1: "location1",
//       location2: "location2",
//       dateOfDeparture: "dateOfDeparture",
//       dateOfReturn: "dateOfReturn",
//     },
//   },
// });
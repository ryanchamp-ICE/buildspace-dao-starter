import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule("0x113Cfcaf6FB6065514837E0a3244A63d4898A771");

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Onward and Upward",
        description: "This NFT will give you access to SweetCityDAO",
        image: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4KICAgIDxzdHlsZT4uYmFzZSB7IGZpbGw6IHdoaXRlOyBmb250LWZhbWlseTogc2VyaWY7IGZvbnQtc2l6ZTogMTRweDsgfTwvc3R5bGU+CiAgICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+I0RpZ0RlZXDim4/vuI88L3RleHQ+Cjwvc3ZnPg==`
      }
    ]);
    console.log("Successfully created a new NFT in the drop!");
  } catch (error) {
    console.log("Failed to create the new NFT", error);
  }
})()
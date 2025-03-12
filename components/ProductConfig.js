"use client";
import { useEffect, useState } from "react";
import ui from "@/app/data/ui";
import Dialog from "./shared/Dialog";
import RadioSelector from "./shared/RadioSelector";

export default function ProductConfig({ productData, locale }) {
  const productInitialState = {
    width: productData.sizes.width[0],
    height: productData.sizes.height[0],
    depth: productData.sizes.depth[0],
  };

  const [productState, setProductState] = useState(productInitialState);
  const [productDialog, setProductDialog] = useState(false);

  //   console.log(productState);

  function handleProductState(e) {
    setProductState({ ...productState, [e.target.name]: e.target.value });
  }

  function handleAddToCart() {
    console.log(productState);
    const productUniqId = idGenerator(productState, productData.url);
    console.log(productUniqId);
  }

  function idGenerator(obj, url) {
    let id = url;
    for (let key in obj) {
      id += `-${obj[key]}`;
    }
    return id;
  }

  useEffect(() => {
    handleAddToCart();
  }, [productState]);

  return (
    <div>
      <Dialog visibility={productDialog} setVisibility={setProductDialog} title={ui.global.configure[locale]}>
        <RadioSelector id="width" title={ui.product_page.width[locale]} options={productData.sizes.width} selected={productState.width} setSelected={handleProductState} />

        <RadioSelector id="height" title={ui.product_page.height[locale]} options={productData.sizes.height} selected={productState.height} setSelected={handleProductState} />

        <RadioSelector id="depth" title={ui.product_page.depth[locale]} options={productData.sizes.depth} selected={productState.depth} setSelected={handleProductState} />
      </Dialog>
      <button onClick={() => setProductDialog(true)}>{ui.global.configure[locale]}</button>
    </div>
  );
}

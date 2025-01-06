"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UpdatePrompt from "./page";

const UpdatePromptWrapper = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  if (!promptId) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt promptId={promptId} />
    </Suspense>
  );
};

export default UpdatePromptWrapper;

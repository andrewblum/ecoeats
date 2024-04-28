import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

function AIFoodTipModal({ title }) {
  const [response, setResponse] = useState(undefined);

  useEffect(() => {
    const baseUrl = '/api/query-ai';
    const params = new URLSearchParams({
      prompt: title,
    });
    const urlWithParams = `${baseUrl}?${params.toString()}`;
    fetch(urlWithParams)
      .then((resp) => resp.json())
      .then((data) => setResponse(data));
  }, [title]);

  return (
    <DialogHeader>
      <DialogTitle className="mb-4">{title}</DialogTitle>
      {response ? (
        <DialogDescription asChild>
          <Markdown>{response.content}</Markdown>
        </DialogDescription>
      ) : (
        <div className="flex space-x-2 justify-center items-center p-6">
          <span className="sr-only">Loading...</span>
          <div className="h-4 w-4 bg-tiffany-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-4 w-4 bg-tiffany-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-4 w-4 bg-tiffany-blue rounded-full animate-bounce" />
        </div>
      )}
    </DialogHeader>
  );
}

export default AIFoodTipModal;

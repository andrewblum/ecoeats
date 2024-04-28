import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';

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
      <DialogTitle> {title} </DialogTitle>
      {response ? (
        <DialogDescription>{response.content}</DialogDescription>
      ) : (
        <div>Loading</div>
      )}
    </DialogHeader>
  );
}

export default AIFoodTipModal;

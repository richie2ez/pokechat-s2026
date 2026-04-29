import React, { useState } from 'react';
import { Icon, Input, Label, Message } from 'semantic-ui-react';
import axios from 'axios';
import { CHAT_API } from '../AppConfig';

const ChatForm = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const chat = async (activeQuery) => {
    const finalQuery = activeQuery || 'ditto limit 1';

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${CHAT_API}/chat/query`, {
        params: { q: finalQuery }
      });

      const results = response.data.data || response.data;
      const ids = results.map((pokemon) => pokemon.id);
      setSearchResults(ids);
      setQuery('');
    } catch (err) {
      setError('Chat request failed. Check that the backend is running and the port is public.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat">
      <Input
        fluid
        value={query}
        loading={loading}
        disabled={loading}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            chat(query);
          }
        }}
        icon={
          <Icon
            name="send"
            inverted
            circular
            link
            onClick={() => chat(query)}
          />
        }
        placeholder="Ask me a Pokemon Question..."
      />

      {error && <Message negative size="small">{error}</Message>}

      <Label
        pointing="above"
        as="button"
        onClick={() => chat('strongest pokemon limit 1')}
      >
        Strongest Pokemon
      </Label>

      <Label
        pointing="above"
        as="button"
        onClick={() => chat('weakest pokemon limit 1')}
      >
        Weakest Pokemon
      </Label>

      <Label
        pointing="above"
        as="button"
        onClick={() => chat('starter pokemon limit 3')}
      >
        Starter Pokemon
      </Label>
    </div>
  );
};

export { ChatForm };
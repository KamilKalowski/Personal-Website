import React, { useMemo, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ kind: 'idle', text: '' });

  const canSend = useMemo(() => message.trim().length >= 3, [message]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!canSend) {
      setStatus({ kind: 'error', text: 'Write a quick message first.' });
      return;
    }

    // TODO: replace with your real email
    const to = 'your@email.com';

    const subject = topic?.trim()
      ? `[Contact] ${topic.trim()}`
      : `[Contact] Message from ${name?.trim() || 'website visitor'}`;

    const bodyLines = [
      `Name: ${name || '(not provided)'}`,
      `Email: ${email || '(not provided)'}`,
      `Topic: ${topic || '(not provided)'}`,
      '',
      message,
    ];

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailto;
    setStatus({ kind: 'sent', text: 'Opening your email client…' });
  };

  return (
    <div className="contact-page">

      <div className="contact-shell">
        <div className="contact-card">
          <header className="contact-header">
            <h1 className="contact-title">Contact Me</h1>
            <p className="contact-subtitle">
              Leave a question, collab idea, or anything you’re curious about.
            </p>
          </header>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="contact-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  className="contact-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kamil Kalowski fanclub"
                  autoComplete="name"
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  className="contact-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-topic">
                Topic
              </label>
              <input
                id="contact-topic"
                className="contact-input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Quant stuff / systems / life / collab"
              />
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="contact-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your question here…"
              />
            </div>

            <div className="contact-actions">
              <button className="contact-button" type="submit" disabled={!canSend}>
                Send
              </button>

              {status.kind !== 'idle' && (
                <div
                  className={[
                    'contact-status',
                    status.kind === 'error' ? 'contact-status-error' : '',
                    status.kind === 'sent' ? 'contact-status-sent' : '',
                  ].join(' ')}
                >
                  {status.text}
                </div>
              )}
            </div>

            <p className="contact-footnote">
              No backend yet — this uses <code>mailto:</code> to open a prefilled email.
              If you want true “submit without email client”, tell me whether you prefer
              Formspree, Netlify Forms, or a tiny Vercel function.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
# Signature Invite Website

This repository keeps invitation templates and their media assets together.

## Structure

- `templates/wedding/` — wedding invitation template source
- `templates/party/` — party invitation template source
- `media/wedding/` — wedding videos, music, and images
- `media/party/` — party videos, music, and images

Large media is stored as normal files instead of Base64 inside TSX. This keeps the template source small and prevents editor memory-limit problems.

Deployment configuration will be added in a later step.

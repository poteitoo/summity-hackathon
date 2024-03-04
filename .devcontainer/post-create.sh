source ~/.bashrc

# Install Python
pyenv install 3.11 && pyenv global 3.11

# Setup Poetry
poetry config virtualenvs.in-project true

# Install dependencies
pnpm i

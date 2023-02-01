# syntax=docker/dockerfile:1.0-experimental

FROM lambci/lambda:build-python3.8

COPY ./requirements /requirements

RUN mkdir -p ~/.ssh && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN --mount=type=ssh \
    python -m venv /ve && \
    source /ve/bin/activate && \
    pip install -r /requirements/lambda.txt

RUN echo 'export PS1="\[\e[36m\]λ.shell>\[\e[m\] "' >> /root/.bashrc

COPY ./lambda/entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]

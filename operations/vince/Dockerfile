FROM golang:1.23.2-bookworm AS build
WORKDIR /src
RUN git init . && git remote add origin https://github.com/vinceanalytics/vince.git \
    && git fetch --depth 1 origin fc06f7a22f785e6e152cb72e3210fcc099b07fa5 \
    && git checkout --detach FETCH_HEAD
COPY event-filter.patch /tmp/event-filter.patch
RUN git apply /tmp/event-filter.patch \
    && CGO_ENABLED=0 go build -trimpath -o /out/vince .
FROM ghcr.io/vinceanalytics/vince@sha256:48e4fdd751e0c2b6fa5ac0e0d59c29b1157499b1e8d78e5ffb14eeb8415e69b0
COPY --from=build /out/vince /vince
ENTRYPOINT ["/vince"]
CMD ["serve"]

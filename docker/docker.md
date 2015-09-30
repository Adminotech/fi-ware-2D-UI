# How to use this Dockerfile

This Dockerfile can be used to build an image of the FIWARE 2D-UI GE.

The [Docker Hub repository](https://hub.docker.com/r/adminotech/2dui/) contains a ready made image that you can pull with:

	docker pull adminotech/2dui

To build the image, run:

    docker build -t 2dui

To run the image in interactive mode (shell), with the container's ports exposed:

    docker run -p 12345:80 --rm 2dui
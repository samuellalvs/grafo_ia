function setGrafo(){
    if($('#qtd_vertices').val() > 20){
        val = 20;
    }else{
        val = $('#qtd_vertices').val();
    }
    criar_grafo(val);
    $('#vert').hide();
    $('#inicio_fim').show();
}

function setAresta(){
    ver1 = $('#inicio').val()
    ver2 = $('#fim').val()
    criar_aresta(parseInt(ver1), parseInt(ver2));
    arestas.forEach(aresta => {
        var div1 = $(`#vertice-${aresta.origem}`);   
        var div2 = $(`#vertice-${aresta.destino}`);
        var x1 = div1.offset().left + (div1.width()/2);
        var y1 = div1.offset().top + (div1.height()/2);
        var x2 = div2.offset().left + (div2.width()/2);
        var y2 = div2.offset().top + (div2.height()/2);
        connectDots(x1,y1,x2,y2);
    });
}


function connectDots(xA,yA,xB,yB){
    var a=document.createElement("div");
    var r=180*Math.atan2(yB-yA,xB-xA)/Math.PI;
    a.setAttribute("style","width:"+Math.sqrt(Math.pow(xA-xB,2)+Math.pow(yA-yB,2))+"px;height:2px;position:absolute;background-color:black;top:"+yA+"px;left:"+xA+"px;-moz-transform:rotate("+r+"deg);-moz-transform-origin:0px 0px;-webkit-transform:rotate("+r+"deg);-webkit-transform-origin:0px 0px;transform:rotate("+r+"deg);transform-origin:0px 0px;-ms-transform:rotate("+r+"deg);-ms-transform-origin:0px 0px;");
    document.body.appendChild(a);
}

var grafo = [];
var arestas = [];
var vertices = 2;
var matriz_arestas = [];

function criar_grafo(num_vertices) {
    $('.linha-cima').html('');
    $('.linha-baixo').html('')
    let i = 1;
    while (i <= num_vertices) {
        if (i % 2 != 0) {
            grafo.push([2, i]);
            $('.linha-cima').append(`<div class="vertice" id="vertice-${i}"  style="z-index:99999; margin-right:16px"><span class="vertice-text">${i}</span></div>`)
        } else {
            grafo.push([0, i]);
            $('.linha-baixo').append(`<div class="vertice" id="vertice-${i}" style="z-index:99999; margin-right:16px"><span class="vertice-text">${i}</span></div>`)
        }
        i++;
    }

    vertices = num_vertices;

}

function criar_aresta(a_origem, a_destino) {
    let opcoes = [];
    let i = 1;
    while (i <= vertices) {
        if (i != 1) {
            if (i != 2) {
                if (i != vertices - 1) {
                    if (i != vertices) {
                        if (i % 2 != 0) {
                            opcoes.push({
                                vertice: i,
                                opcoes: [i - 2, i - 1, i + 1, i + 2, i + 3]
                            });
                        } else {
                            opcoes.push({
                                vertice: i,
                                opcoes: [i - 3, i - 2, i - 1, i + 1, i + 2]
                            });
                        }

                    } else {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 2, i - 1]
                        });
                    }
                } else {
                    if (i % 2 != 0) {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 2, i - 1, i + 1]
                        });
                    } else {
                        opcoes.push({
                            vertice: i,
                            opcoes: [i - 3, i - 2, i - 1, i + 1]
                        });
                    }

                }

            } else {
                opcoes.push({
                    vertice: i,
                    opcoes: [i - 1, i + 1, i + 2]
                });
            }
        } else {
            opcoes.push({
                vertice: i,
                opcoes: [i + 1, i + 2, i + 3]
            });
        }
        i++;
    }

    opcoes.forEach(vertice => {
        if (vertice.vertice == a_origem) {
            if (vertice.opcoes.indexOf(a_destino) > -1) {
                if (a_origem % 2 != 0) {
                    if (a_destino == a_origem + 3 || a_destino == a_origem - 1) {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1.41
                        });
                    } else {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1
                        });
                    }
                } else {
                    if (a_destino == a_origem - 3 || a_destino == a_origem + 1) {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1.41
                        });
                    } else {
                        arestas.push({
                            origem: a_origem,
                            destino: a_destino,
                            peso: 1
                        });
                    }
                }

                matriz_arestas.push([a_origem, a_destino]);
            } else {
            }
        }
    });

}
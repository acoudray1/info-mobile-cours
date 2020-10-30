import 'package:flutter/material.dart';

class BoutonContact extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      child: Text('Cas Contact'),
      color: Color(0xffb74093),
      hoverColor: Colors.deepPurpleAccent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0)),
      onPressed: () => showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Contactez moi'),
            content: Text('Je suis joignable à l\'IMT Atlantique'),
          );
        }
      ),
    );
  }
}
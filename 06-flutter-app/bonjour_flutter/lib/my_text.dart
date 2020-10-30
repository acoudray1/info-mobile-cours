import 'package:flutter/material.dart';

class MyText extends StatelessWidget {
  MyText(this.text, this.fontWeight, this.fontSize);

  final String text;
  final FontWeight fontWeight;
  final double fontSize;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(this.text,
        textDirection: TextDirection.ltr,
        style: TextStyle(
          color: Color(0xffb74093),
          fontSize: this.fontSize,
          fontWeight: this.fontWeight,
        ),
      ),
    );
  }
}